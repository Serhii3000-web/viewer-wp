// HudManagerCSS.js

class HudManagerCSS {

    static apply(root, factionName) {

        const css = HUD_CSS[factionName];

        if (!css) return;

        Object.entries(css).forEach(([key, value]) => {
            root.style.setProperty(key, value);
        });
    }
}