const $ = (function () {
    const q = {};

    Object.assign(q, {
        attr,
        css,
        dom,
        each,
        on,
    })

    return (function (selector) {
        Object.assign(q, {
            selector,
            nodes: selector instanceof Element ? [selector] : document.querySelectorAll(selector),
        })
        return q;
    })

    function attr(prop, val) {
        if (Boolean(val)) {
            this.each(function (node) {
                Element.prototype.setAttribute.apply(node, [prop, val]);
            });
            return this;
        } else {
            return Array.prototype.map.call(this.nodes, function (node) {
                return node.getAttribute(prop);
            });
        }
    }

    function css(prop, val) {
        if (Boolean(val)) {    //setter
            this.each(function (node) {
                CSSStyleDeclaration.prototype.setProperty.apply(node.style, [prop, val]);
            });
            return this
        } else {                   //getter
            return this.nodes[0].style[prop];
        }
    }

    function dom() {
        let arr = [...this.nodes];
        return arr.length === 1 ? arr[0] : arr;
    }

    function each(action) {
        this.nodes.forEach(function (item, i) {
            action(item, i)
        })
        return this;
    }

    function on(type, callback) {
        this.each(function (node) {
            node['on' + type] = callback
        })
        return this;
    }
})();
