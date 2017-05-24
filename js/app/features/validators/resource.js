import '../../base';


{

  /**
   * Initializes the view.
   * @return {[type]} [description]
   */
  const onReady = function() {

    // selector cache
    const
      $dropdownItem = $('.menu .dropdown .item'),
      $popupItem = $('.popup.example .browse.item'),
      $menuItem = $('.menu a.item, .menu .link.item').not($dropdownItem),
      $dropdown = $('.menu .ui.dropdown');

    $dropdown
      .dropdown({
        on: 'hover'
      });

    $('.main.container .ui.search')
      .search({
        type: 'category',
        apiSettings: {
          action: 'categorySearch'
        }
      });

    $('.browse.item')
      .popup({
        popup: '.resources.popup',
        hoverable: true,
        position: 'bottom left',
        delay: {
          show: 200,
          hide: 400
        }
      });

    $popupItem
      .popup({
        inline: true,
        hoverable: true,
        popup: '.fluid.popup',
        position: 'bottom left',
        delay: {
          show: 100,
          hide: 100
        }
      });

    $menuItem
      .on('click', onResourceSelected);

    $('.link.list .item').api({
      action: 'get resource',
      urlData: {
        name: $(this).attr('data-name')
      },
      dataType: 'html',
      onSuccess(response) {
        $('.ui.resource-contents').html(response);
      }
    });

    // initialize the tab
    $('.menu .item')
      .tab();

    const opts = {
      url: '/validators/validate',
      acceptedFiles: '.csv'
    };
    $('#csv-upload').dropzone(opts);
  };

  /**
   * User has selected a resource type
   * @return {[type]} [description]
   */
  const onResourceSelected = function() {

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
