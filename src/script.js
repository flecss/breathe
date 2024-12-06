(() => {
    document.addEventListener("DOMContentLoaded", () => {
        const styleEl = document.createElement("style");
        styleEl.textContent = `@CSS`;
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