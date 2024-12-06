(() => {
    document.addEventListener("DOMContentLoaded", () => {
        const styleEl = document.createElement("style");
        styleEl.textContent = `:root {--breathe__magnitude: 20%;}body *[data-breathe],body[data-breathe-speed="normal"] *[data-breathe] {--breathe__speed: 800ms;}body[data-breathe-speed="fast"] *[data-breathe] {--breathe__speed: 400ms;}body[data-breathe-speed="slow"] *[data-breathe] {--breathe__speed: 1200ms;}*[data-breathe] {transition: transform var(--breathe__speed), filter var(--breathe__speed);}*[data-breathe="fade"] {filter: opacity(0.0);}*[data-breathe="rise"] {transform: translateY(var(--breathe__magnitude));filter: opacity(0.0);}*[data-breathe="flip-v"] {visibility: hidden;transform: rotateX(-90deg);}*[data-breathe="flip-h"] {visibility: hidden;transform: rotateY(-90deg);}*[data-breathe="bounce:a"] {transition-timing-function: cubic-bezier(0.125, 0.125, 0.5, 1.75);}*[data-breathe="bounce"] {transform: translateY(var(--breathe__magnitude));filter: opacity(0.0);}*[data-breathe="pulse:a"] {transition-timing-function: cubic-bezier(0.125, 0.125, 0.5, 1.75);}*[data-breathe="pulse"] {transform: scale(calc(100% - var(--breathe__magnitude)));filter: opacity(0.0);}`;
        document.head
            .appendChild(styleEl);
    });
})();

(() => {
    const _config = {
        attrs: {
            bind: "data-breathe",
            activatedSuffix: ":a"
        },
        transitionDelayMs: 400
    };

    function breathe() {
        Array.from(
            document.querySelectorAll(`[${_config.attrs.bind}]`)
        )
            .forEach((element) => {
                if(element[_config.boundPropertyName]) return;

                const boundingRect = element.getBoundingClientRect();
                
                if(boundingRect.top > (window.scrollY + window.innerHeight)
                || (boundingRect.top + boundingRect.height) < 0) return;

                const attrValue = element.getAttribute(_config.attrs.bind);
                if(attrValue.slice(-_config.attrs.activatedSuffix.length) === _config.activatedSuffix)
                    return;

                setTimeout(() => {
                    element
                        .setAttribute(
                            _config.attrs.bind,
                            [ attrValue, _config.attrs.activatedSuffix ].join("")
                        )
                }, _config.transitionDelayMs * (boundingRect.top / window.innerHeight));
            });
    }

    document.addEventListener("DOMContentLoaded", breathe);
    window.addEventListener("scroll", breathe);
})();