/* eslint-disable import/no-unresolved */
import { addClass, removeClass } from 'Views/components/audio-player/utils';

const ACTIVE_ITEM_CLASS = 'playlist__item--active';

class Tracklist {
  // eslint-disable-next-line no-shadow
  constructor($rootElement, player) {
    this.player = player;

    this.currentTrack = null;
    this.playlist = [];
    this.$tracks = $rootElement.querySelectorAll('[data-type=audioplayerTracklistItem]');
    this.$prevButton = $rootElement.querySelector('[data-type=audioplayerPrevButton]');
    this.$nextButton = $rootElement.querySelector('[data-type=audioplayerNextButton]');

    this.#init();
    this.setFirstTrackAsActive();
    window.tracklist = this;
  }

  #init() {
    this.$tracks.forEach((element, order) => {
      const id = element.getAttribute('data-id');
      const title = element.getAttribute('data-title');
      const source = element.getAttribute('data-source-src');
      const type = element.getAttribute('data-source-type');
      const duration = element.getAttribute('data-duration');
      const track = {
        order, id, title, source, type, duration, element,
      };
      this.playlist.push(track);

      element.addEventListener('click', () => {
        this.changeTrack(track);
      });
    });

    this.$prevButton?.addEventListener('click', () => {
      if (this.currentTrack && this.currentTrack.order > 0) {
        const prevTrack = this.playlist.at(this.currentTrack.order - 1);
        this.changeTrack(prevTrack);
      }
    });

    this.$nextButton?.addEventListener('click', () => {
      if (this.currentTrack && this.currentTrack.order < this.playlist.length - 1) {
        const nextTrack = this.playlist.at(this.currentTrack.order + 1);
        this.changeTrack(nextTrack);
      }
    });
  }

  /**
   * @returns {void}
   */
  setFirstTrackAsActive() {
    const [firstTrack] = this.playlist;
    if (!firstTrack) {
      return;
    }
    this.currentTrack = firstTrack;
    this.highlightActiveElementInTracklistWidget();
  }

  changeTrack(nextTrack) {
    this.currentTrack = nextTrack;
    this.player.changeTrack(this.currentTrack);
    this.highlightActiveElementInTracklistWidget();
  }

  highlightActiveElementInTracklistWidget() {
    this.playlist.forEach((track) => {
      removeClass(track.element, ACTIVE_ITEM_CLASS);
    });
    addClass(this.currentTrack.element, ACTIVE_ITEM_CLASS);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const [audioPlayer] = window.playerController.audioPlayers;
  const $rootElement = document.querySelector('[data-type=audioplayerWithTracklist]');
  // eslint-disable-next-line no-new
  new Tracklist($rootElement, audioPlayer);
});
