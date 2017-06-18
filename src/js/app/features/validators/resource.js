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

      // initialize the tab
    $('.menu .item')
        .tab();

    const opts = {
      url: '/validators/resources/validate',
      acceptedFiles: '.csv'
    };

      // create the dropzone instance
    const dzone = new Dropzone('#csv-upload', opts);
    dzone.disable();

      // set some extra form data before
      // uploading the file
    dzone.on('sending', (file, xhr, form) => {
      const type = $('.item.resource.active', $view).attr('data-name');
      form.set('type', type);
    });

    dzone.on('error', (file, error) => {

      $('.ui.dimmer .icon').removeClass('checkmark green').addClass('bug red');
      $('.ui.dimmer span').text(`${error.message}`);
      $('.ui.dimmable').dimmer('show');
    });

    dzone.on('success', (file) => {

      $('.ui.dimmer .icon').removeClass('bug red').addClass('checkmark green');
      $('.ui.dimmer span').text(`Success! File '${file.name}' is valid.`);
      $('.ui.dimmable').dimmer('show');
    });

    $('.ui.dimmable').dimmer({
      closeable: true
    });

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

        $('.ui.table i')
          .popup();

        // enable and clear the dzone
        dzone.enable();
        dzone.removeAllFiles();
        $('.ui.dimmable').dimmer('hide');
      }
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
