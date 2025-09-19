const tabEndpointMap = {
	"1": "/api/recycling-point",
	"2": "/api/waste-types",
	"3": "/api/achievements",
	"4": "/api/report"
};

const formEndpointMap = {
	"pointForm": "/api/recycling-point",
	"typeForm": "/api/waste-types",
	"achievementForm": "/api/achievements",
	"reportForm": "/api/report"
}

let currentTab = "";

$(function () {
    function fetchItemsReal(endpoint, callback) {
        $.ajax({
            url: endpoint,
            type: "GET",
            dataType: "json",
            success: function(data) {
                callback(data);
            },
            error: function(jqXHR, textStatus) {
                console.error("AJAX-запрос не удался: " + textStatus);
            }
        });
    }

	function getTabNumber(tabId) {
		return tabId.split('-')[1];
	}

	function handleTab(tabId) {
		var tabNum = getTabNumber(tabId);
		var $content = $('#content-' + tabNum);
		var endpoint = tabEndpointMap[tabNum];
		if ($content.data('loaded')) return;

		var $table = $content.find('table.table-info');
		if (!$table.length) return;
		var $tbody = $table.find('tbody');
		$tbody.empty();

		fetchItemsReal(endpoint, function(data) {
			if (data.status !== 'ok') return;
			var items = data.items;
			if (!items) return;
			$.each(items, function(_, item) {
		        var $tr = $("<tr>").addClass("table-info__column");
		        $.each(item, function(_, value) {
		    		$("<td>").addClass("table-info__row").text(value).appendTo($tr);
		        });
		    	$tbody.append($tr);
		    });
		    $content.data("loaded", true);
		});
	}

	$('input[name="tabs-group"]').on('change', function () {
		if (window.location.pathname == '/reports.html') {
			currentTab = this.id;
			handleTab(this.id);
		}
	});

	var initial = $('input[name="tabs-group"]:checked').attr('id');
	if (initial) {
		if (window.location.pathname == '/reports.html') {
			currentTab = initial;
			handleTab(initial);
		}
	}

	$('.js-button-submit').on('click', async function (e) {
		e.preventDefault();
		let form = $(this).closest('form');
		let data = new FormData(form[0]);
		data.append('formID', form.attr('id'));

		if (form.attr('id') === "reportForm") {
			const temp = await fetch('/auth/me', { credentials: 'include' });
			if (temp.ok) {
				let tempData = await temp.json();
				data.append('userid', tempData.item.id);
			}
		}

		var endpoint = formEndpointMap[form.attr('id')];
		$.ajax({
			url: endpoint,
			method: 'post',
			processData: false,
			contentType: false,
			data: data,
			success: function (data) {
				let html = '';
				if (data.status == 'ok') {
					form.find('input, textarea').val('');
					form.find('select').prop('selectedIndex', 0);
					html = `Данные успешно записаны`;
				} else {
					html = `Произошла ошибка:`  + data.message;
				}
				$(form).closest('.tabs__item').find('.js-form-responce').html(html);
			},
			error: function (xhr, textStatus, errorThrown) {
				console.error(xhr.responseText);
			},
		});
	});

	$('.js-button-delete').on('click', function (e) {
		e.preventDefault();
		
		var tabNum = getTabNumber(currentTab);
		var $content = $('#content-' + tabNum);
		var $block = $content.find('div.delete__block');
		const id = $block.find('input.delete__id').val().trim();
		const endpoint = tabEndpointMap[tabNum] + `/${id}`;

		if (!confirm(`Вы уверены, что хотите удалить элемент с идентификатором ${id}?`)) return;

		$.ajax({
			url: endpoint,
			method: 'DELETE',
			success: function (data) {
				if (data.status === 'ok') {
					$content.find('table.table-info tbody tr').filter(function () {
						return $(this).find('td:first').text() === id;
					}).remove();

					$block.find('input.delete__id').val('');
					html='Элемент успешно удален';
				} else {
					html='Ошибка при удалении' + data.message;
				}
				$($content).closest('.tabs__item').find('.js-form-responce').html(html);
			},
			error: function (xhr) {
				console.error('Ошибка при удалении:', xhr.responseText);
				alert('Ошибка при удалении элемента');
			}
		});
	});

	function initDynamicSelect(select) {
		const url = select.dataset.url;
		const placeholder = select.dataset.placeholder || 'Выберите значение';
		const valueKey = select.dataset.valueKey || 'value';
		const textKey = select.dataset.textKey || 'text';

		if (!url)
			return;

		fetch(url)
			.then(res => {
				if (!res.ok) throw new Error('Ошибка запроса');
				return res.json();
			})
			.then(data => {
				select.innerHTML = `<option disabled selected>${placeholder}</option>`;
				
				const items = data.items;
				items.forEach(item => {
					const option = document.createElement('option');
					option.value = item[valueKey];
					option.textContent = item[textKey];
					select.appendChild(option);
				});
			})
			.catch(err => {
				console.error(err);
				select.innerHTML = `<option disabled selected>Ошибка загрузки</option>`;
			});
	}

	document.querySelectorAll('select[data-url]').forEach(initDynamicSelect);
});