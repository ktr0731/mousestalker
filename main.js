class Vim {
    constructor(x, y) {
        this.t = 5;

        const max = 10, min = 0;
        const randNum = Math.floor(Math.random() * (max - min) + min);
        if (randNum === 0) {
            this.$element = $('<img id="cursor" width=50px height=50px src="./cursor2.png">');
        } else {
            this.$element = $('<img id="cursor" width=50px height=50px src="./cursor.png">');
        }
        this.$element.css({'left': x, 'top': y});
        this.y = y;

        this.dropDown = this.dropDown.bind(this);
    }

    start() {
        this.dropDown();
    }

    dropDown() {
        const y = this.y + (1 / 2 * 9.8 * this.t * this.t) / 50;
        if (y > window.innerHeight) {
            this.$element.remove();
            return;
        }
        this.$element.css({'top': y});
        this.t++;
        setTimeout(this.dropDown, 10);
    }
}

class VimController {
    constructor() {
        this.$body = $('body');
    }

    create(x, y) {
        const vim = new Vim(x, y);
        this.$body.append(vim.$element);
        vim.start();
    }
}

(() => {
    const vimController = new VimController();
    let sep = 3;
    let cnt = 0;
    window.addEventListener('mousemove', e => {
        cnt = (cnt + 1) % sep;
        if (cnt != 0) {
            return;
        }
        vimController.create(e.x, e.y);
    });
})();
