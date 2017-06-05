import '../../base';


{

  const $view = $('#view-resources');

  let selectedResource = null;

  /**
   * Initializes the view.
   * @return {[type]} [description]
   */
  const onReady = function() {

    // selector cache
    const $menuItem = $('.link .item.resource', $view);
    const $dropdown = $('.menu .ui.dropdown', $view);
    const $resources = $('.resources.item', $view);
    const $resource = $('.link.list .item', $view);

    $dropdown
      .dropdown({
        on: 'hover'
      });

    $('.main.container .ui.search', $view)
      .search({
        type: 'category',
        apiSettings: {
          action: 'categorySearch'
        }
      });

    $resources.popup({
      popup: '.resources.popup',
      hoverable: true,
      position: 'bottom left',
      delay: {
        show: 200,
        hide: 400
      }
    });

    // user selected a resource type
    $menuItem
      .on('click', onResourceSelected);

    // fetches resource schema
    $resource.api({
      action: 'get resource',
      urlData: {
        name: $(this).attr('data-name')
      },
      dataType: 'html',
      onSuccess(response) {
        $('.ui.resource-contents').html(response);
        $('.resources.item').popup('hide');

        $('.foreign-key').on('click', (e) => {
          const resource = $(e.target).attr('data-resource');

          // open the selected resource
          $(`.item.resource[data-name='${resource}']`).trigger('click');
        });
      }
    });

    // initialize the tab
    $('.menu .item')
      .tab();

    const opts = {
      url: '/validators/resources/validate',
      acceptedFiles: '.csv'
    };

    // create the dropzone instance
    const dzone = new Dropzone('#csv-upload', opts);

    // set some extra form data before
    // uploading the file
    dzone.on('sending', (file, xhr, form) => {
      const type = $('.item.resource.active', $view).attr('data-name');
      form.set('type', type);
    });
  };

  /**
   * User has selected a resource type
   * @return {[type]} [description]
   */
  const onResourceSelected = function() {

    selectedResource = $(this).attr('data-name');

    // set the link on the 'download sample csv' button
    $('.download-sample', $view)
      .attr('href', `/static/data/samples/${selectedResource}.csv`)
      .removeClass('disabled');


    if (!$(this).hasClass('dropdown browse')) {
      $(this)
        .addClass('active')
        .closest('.ui.menu')
        .find('.item')
        .not($(this))
        .removeClass('active');
    }


  };


  // attach ready event
  $(document)
    .ready(onReady);

}
