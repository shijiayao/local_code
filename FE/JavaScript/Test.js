{
    const canvas_id = document.getElementById('canvas_id');

    let DPR = devicePixelRatio;
    DPR = 1;

    const width = window.innerWidth * DPR;
    const height = window.innerHeight * DPR;

    const fontSize = 20 * DPR;

    canvas_id.width = width;
    canvas_id.height = height;
    canvas_id.contenteditable = true;

    const canvas_ctx = canvas_id.getContext('2d');

    canvas_ctx.fillStyle = 'red';
    canvas_ctx.font = `${fontSize}px "Roboto Mono"`;
    canvas_ctx.fillText('Hello Word', 5, 100);

    CanvasRenderingContext2D.prototype._fillText = CanvasRenderingContext2D.prototype.fillText;

    CanvasRenderingContext2D.prototype.fillText = function (...p) {
        console.log(p);

        return this._fillText(...p);
    };
}
