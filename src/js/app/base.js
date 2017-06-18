
import 'semantic-ui-css/semantic.min.css';
import '../../static/css/app.css';

import 'semantic-ui-css/semantic.min.js';

import 'dropzone/dist/dropzone.js';
import 'dropzone/dist/dropzone.css';
Dropzone.autoDiscover = false;

import './api';

{

  /**
   * Initializes the view.
   * @return {[type]} [description]
   */
  const onReady = function() {

    const $menu = $('#toc');

    $menu
      .sidebar({
        dimPage: true,
        transition: 'overlay',
        mobileTransition: 'uncover'
      });

    // launch buttons
    $menu
      .sidebar('attach events', '.launch.button, .view-ui, .launch.item');
    // launch buttons
    $menu.sidebar('attach events', '.launch.button, .view-ui, .launch.item');


    $('.ui.embed').embed();

  };


  // attach ready event
  $(document)
    .ready(onReady);

}
