// src/lib/actions/tooltip.ts
import tippy from 'tippy.js';
import type { Action } from 'svelte/action';
import 'tippy.js/dist/tippy.css';

export const tooltip: Action<HTMLElement, string | HTMLElement> = (node, content) => {
	const tip = tippy(node, {
		content,
		allowHTML: true,
		placement: 'top',
		theme: 'light-border',
		delay: [100, 50]
	});

	return {
		update(newContent) {
			tip.setContent(newContent);
		},
		destroy() {
			tip.destroy();
		}
	};
};
