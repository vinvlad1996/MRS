/* eslint-disable import/no-unresolved */
import {
  addClass, formatTime, getPercent, removeClass,
} from 'Views/components/audio-player/utils';
import Plyr from 'plyr';
import playHoverSvg from 'Images/icons/player/playHovered.svg';
import playSvg from 'Images/icons/player/play.svg';
import pauseHoverSvg from 'Images/icons/player/pauseHovered.svg';
import pauseSvg from 'Images/icons/player/pause.svg';

const HIDDEN_CONTROL_CLASS = 'audioplayer__control--hidden';

class Player {
  /**
   * @param {string} source
   * @param {string} type
   * @param {string} title
   * @param {string} id
   * @param {HTMLElement} element
   * @param {string} duration
   */
  constructor(source, type, title, id, element, duration) {
    const [$audio] = element.getElementsByTagName('audio');
    this.audio = new Plyr($audio, { controls: [], debug: true });

    this.$pauseButton = element.querySelector('[data-type=audioplayerPauseBtn]');
    this.$pauseButtonIcon = element.querySelector('[data-svg=audioplayerPauseSvg]');
    this.$playButton = element.querySelector('[data-type=audioplayerPlayBtn]');
    this.$playButtonIcon = element.querySelector('[data-svg=audioplayerPlaySvg]');
    this.$trackTitle = element.querySelector('[data-type=audioplayerTrackTitle]');
    this.$trackDuration = element.querySelector('[data-type=audioplayerTrackDuration]');
    this.$trackPosition = element.querySelector('[data-type=audioplayerTrackPosition]');
    this.$trackProgressPosition = element.querySelector('[data-type=audioplayerTrackProgressPosition]');
    this.$trackProgressRange = element.querySelector('[data-type=audioplayerTrackProgressRange]');

    this.meta = {
      id, title, source, type, element,
    };

    this.#initHandlers();
    this.#resetTrackWidget(title, duration);
  }

  /**
   * @returns {Promise<void>}
   */
  async play() {
    try {
      await this.audio.play();
    } catch {
      // do nothing
    }
  }

  /**
   * @returns {void}
   */
  pause() {
    this.audio.pause();
  }

  /**
   * @param {MouseEvent} event
   * @returns {void}
   */
  seek(event) {
    this.audio.currentTime = this.audio.duration * (+event.target.value / 100);
    this.$trackProgressPosition.style.width = `${event.target.value}%`;
  }

  /**
   * @param {Object} track
   * @returns {Promise<void>}
   */
  async changeTrack(track) {
    this.audio.ready = true;
    this.audio.stop();
    const {
      title, type, source, duration,
    } = track;

    const sourceToSet = {
      type: 'audio',
      title,
      sources: [{ src: source, type }],
    };

    this.audio.source = sourceToSet;
    this.#resetTrackWidget(title, duration);
    await this.play();
  }

  /**
   * @returns {void}
   */
  #initHandlers() {
    this.audio.on('play', () => this.showPlayButton());
    this.audio.on('pause', () => this.showPauseButton());
    this.audio.on('ended', () => this.showPauseButton());
    this.audio.on('timeupdate', () => this.updateDurationTime());

    this.$trackProgressRange.addEventListener('input', (event) => this.seek(event));

    this.$playButton.addEventListener('mouseover', () => this.$playButtonIcon.setAttribute('src', playHoverSvg));
    this.$playButton.addEventListener('mouseout', () => this.$playButtonIcon.setAttribute('src', playSvg));
    this.$playButton.addEventListener('click', () => this.play());

    this.$pauseButton.addEventListener('mouseover', () => this.$pauseButtonIcon.setAttribute('src', pauseHoverSvg));
    this.$pauseButton.addEventListener('mouseout', () => this.$pauseButtonIcon.setAttribute('src', pauseSvg));
    this.$pauseButton.addEventListener('click', () => this.pause());
  }

  /**
   * @param {string} title
   * @param {string} duration
   * @returns {void}
   */
  #resetTrackWidget(title, duration) {
    this.$trackTitle.textContent = title;
    this.$trackDuration.textContent = duration;
    this.$trackProgressPosition.style.width = '7px';
    this.$trackProgressRange.value = 0;
  }

  /**
   * @returns {void}
   */
  updateDurationTime() {
    this.$trackPosition.textContent = formatTime(this.audio.currentTime);
    this.$trackProgressPosition.style.width = `${getPercent(this.audio.currentTime, this.audio.duration)}%`;
    this.$trackProgressRange.value = getPercent(this.audio.currentTime, this.audio.duration);
  }

  /**
   * @returns {void}
   */
  showPauseButton() {
    addClass(this.$pauseButton, HIDDEN_CONTROL_CLASS);
    removeClass(this.$playButton, HIDDEN_CONTROL_CLASS);
  }

  /**
   * @returns {void}
   */
  showPlayButton() {
    addClass(this.$playButton, HIDDEN_CONTROL_CLASS);
    removeClass(this.$pauseButton, HIDDEN_CONTROL_CLASS);
  }
}

class PlayerController {
  constructor() {
    this.audioPlayers = [];
    this.currentPlayerId = this.audioPlayers[0]?.meta.id;
    this.#init();
  }

  addPlayer(source, type, title, id, $audioPlayer, duration) {
    this.audioPlayers.push(new Player(source, type, title, id, $audioPlayer, duration));
  }

  setCurrentPlayer(audioPlayer) {
    this.currentPlayerId = audioPlayer.meta.id;
  }

  findPlayerById(id) {
    return this.audioPlayers.find((audioPlayer) => audioPlayer.meta.id === id);
  }

  changeCurrentPlayer(id) {
    const player = this.findPlayerById(id);
    if (!player) {
      return;
    }

    this.setCurrentPlayer(player);
    this.audioPlayers
      .filter((item) => item.meta.id !== this.currentPlayerId)
      .forEach((item) => item.pause());
  }

  #init() {
    window.addEventListener('DOMContentLoaded', () => {
      document.querySelectorAll('[data-type=audioplayer]').forEach(($audioPlayer) => {
        const id = $audioPlayer.getAttribute('data-id');
        const title = $audioPlayer.getAttribute('data-title');
        const duration = $audioPlayer.getAttribute('data-duration');
        const source = $audioPlayer.getAttribute('data-source-src');
        const type = $audioPlayer.getAttribute('data-source-type');

        this.addPlayer(source, type, title, id, $audioPlayer, duration);
      });

      document.addEventListener('click', (event) => {
        const element = event.target.closest('[data-type=audioplayer]');
        if (element) {
          this.changeCurrentPlayer(element.getAttribute('data-id'));
        }
      });
    });
  }
}

window.playerController = new PlayerController();
