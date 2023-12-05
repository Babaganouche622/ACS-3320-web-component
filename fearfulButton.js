class FearfulButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-block;
          position: relative;
        }

        button {
          position: absolute;
          padding: 10px 20px;
          cursor: pointer;
          font-size: 5rem;
        }
      </style>
      <button id="fearfulButton">😱</button>
    `;
    this.button = this.shadowRoot.getElementById('fearfulButton');
    this.moveButtonAway = this.moveButtonAway.bind(this);
    this.handleClicks = this.handleClicks.bind(this);
    this.button.clicks = 0;
  }

  connectedCallback() {
    this.button.addEventListener('mouseover', this.moveButtonAway);
    this.button.addEventListener('click', this.handleClicks);
    this.button.addEventListener('click', this.moveButtonAway);
  };

  disconnectedCallback() {
    this.button.addEventListener('mouseover', this.moveButtonAway);
    this.button.addEventListener('click', this.handleClicks);
    this.button.addEventListener('click', this.moveButtonAway);
  };

  moveButtonAway(event) {
    const buttonRect = this.button.getBoundingClientRect();

    let moveX = this.getRandomInt(-500, 500);
    let moveY = this.getRandomInt(-500, 500);

    const maxX = window.innerWidth - buttonRect.width;
    const maxY = window.innerHeight - buttonRect.height;

    const newXposition = buttonRect.x + moveX;
    const newYposition = buttonRect.y + moveY;

    if (newXposition < 0 || newXposition > maxX) {
      this.button.style.left = `${maxX / 2}px`;
    } else {
      this.button.style.left = `${newXposition}px`;
    }

    if (newYposition < 0 || newYposition > maxY) {
      this.button.style.top = `${maxY / 2}px`;
    } else {
      this.button.style.top = `${newYposition}px`;
    }
  }


  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  handleClicks(event) {
    this.button.clicks++;

    if (this.button.clicks >= 11) {
      this.button.clicks = 0;
      this.button.textContent = '😱';
      this.button.style.fontSize = '5rem';
    } else if (this.button.clicks >= 10) {
      this.button.textContent = '💦';
      this.button.style.fontSize = '25rem';
      this.moveButtonAway();
    } else if (this.button.clicks >= 5) {
      this.button.textContent = '🥵';
      this.button.style.fontSize = '25rem';
      this.moveButtonAway();
    } else if (this.button.clicks >= 1) {
      this.button.textContent = '😳';
      this.button.style.fontSize = '10rem';
      this.moveButtonAway();
    }
  };
}


customElements.define('fearful-button', FearfulButton);
