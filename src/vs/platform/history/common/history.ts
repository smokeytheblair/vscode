/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Event as CommonEvent } from 'vs/base/common/event';
import { createDecorator } from 'vs/platform/instantiation/common/instantiation';
import { IWorkspaceIdentifier, ISingleFolderWorkspaceIdentifier } from 'vs/platform/workspaces/common/workspaces';
import { URI } from 'vs/base/common/uri';

export const IHistoryMainService = createDecorator<IHistoryMainService>('historyMainService');

export interface IRecentlyOpened {
	workspaces: Array<IRecentWorkspace | IRecentFolder>;
	files: IRecentFile[];
}

export type IRecent = IRecentWorkspace | IRecentFolder | IRecentFile;

export interface IRecentWorkspace {
	workspace: IWorkspaceIdentifier;
	label?: string;
}

export interface IRecentFolder {
	folder: ISingleFolderWorkspaceIdentifier;
	label?: string;
}

export interface IRecentFile {
	file: URI;
	label?: string;
}

export function isRecentWorkspace(curr: IRecent): curr is IRecentWorkspace {
	return !!curr['workspace'];
}

export function isRecentFolder(curr: IRecent): curr is IRecentFolder {
	return !!curr['folder'];
}

export function isRecentFile(curr: IRecent): curr is IRecentFile {
	return !!curr['file'];
}


export interface IHistoryMainService {
	_serviceBrand: any;

	onRecentlyOpenedChange: CommonEvent<void>;

	addRecentlyOpened(workspaces: Array<IRecentWorkspace | IRecentFolder | IRecentFile>): void;
	getRecentlyOpened(): IRecentlyOpened;
	removeFromRecentlyOpened(paths: Array<IWorkspaceIdentifier | ISingleFolderWorkspaceIdentifier | URI | string>): void;
	clearRecentlyOpened(): void;

	updateWindowsJumpList(): void;
}