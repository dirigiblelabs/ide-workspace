/*
 * Copyright (c) 2010-2020 SAP and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v2.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v20.html
 *
 * Contributors:
 *   SAP - initial API and implementation
 */
let extensions = require('core/v4/extensions');
let response = require('http/v4/response');

let templates = [];
let templateExtensions = extensions.getExtensions('ide-workspace-menu-new-template');

for (let i = 0; i < templateExtensions.length; i++) {
	let module = templateExtensions[i];
	try {
		let templateExtension = require(module);
		let template = templateExtension.getTemplate();
		template.id = module;
		templates.push(template);
	} catch (error) {
		console.error('Error occured while loading metadata for the template: ' + module);
		console.error(error);
	}
}

templates = templates.sort((a, b) => a.label.toLowerCase().localeCompare(b.label.toLowerCase()));

response.println(JSON.stringify(templates));