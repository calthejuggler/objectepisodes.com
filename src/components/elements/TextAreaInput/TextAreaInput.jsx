import React, { useCallback, useMemo, useState } from 'react';
import isHotkey from 'is-hotkey';
import { Editable, withReact, useSlate, Slate } from 'slate-react';
import { Editor, Transforms, createEditor } from 'slate';
import { withHistory } from 'slate-history';

import Button from './components/Button';
import Icon from './components/Icon';
import Toolbar from './components/Toolbar';

const HOTKEYS = {
	'mod+b': 'bold',
	'mod+i': 'italic',
	'mod+u': 'underline',
	'mod+`': 'code',
};

const LIST_TYPES = ['numbered-list', 'bulleted-list'];

const toggleBlock = (editor, format) => {
	const isActive = isBlockActive(editor, format);
	const isList = LIST_TYPES.includes(format);

	Transforms.unwrapNodes(editor, {
		match: n => LIST_TYPES.includes(n.type),
		split: true,
	});

	Transforms.setNodes(editor, {
		type: isActive ? 'paragraph' : isList ? 'list-item' : format,
	});

	if (!isActive && isList) {
		const block = { type: format, children: [] };
		Transforms.wrapNodes(editor, block);
	}
};

const toggleMark = (editor, format) => {
	const isActive = isMarkActive(editor, format);

	if (isActive) {
		Editor.removeMark(editor, format);
	} else {
		Editor.addMark(editor, format, true);
	}
};

const isBlockActive = (editor, format) => {
	const [match] = Editor.nodes(editor, {
		match: n => n.type === format,
	});

	return !!match;
};

const isMarkActive = (editor, format) => {
	const marks = Editor.marks(editor);
	return marks ? marks[format] === true : false;
};

const Element = ({ attributes, children, element }) => {
	switch (element.type) {
		case 'block-quote':
			return <blockquote {...attributes}>{children}</blockquote>;
		case 'bulleted-list':
			return <ul {...attributes}>{children}</ul>;
		case 'heading-one':
			return <h1 {...attributes}>{children}</h1>;
		case 'heading-two':
			return <h2 {...attributes}>{children}</h2>;
		case 'list-item':
			return <li {...attributes}>{children}</li>;
		case 'numbered-list':
			return <ol {...attributes}>{children}</ol>;
		default:
			return <p {...attributes}>{children}</p>;
	}
};

const Leaf = ({ attributes, children, leaf }) => {
	if (leaf.bold) {
		children = <strong>{children}</strong>;
	}

	if (leaf.code) {
		children = <code>{children}</code>;
	}

	if (leaf.italic) {
		children = <em>{children}</em>;
	}

	if (leaf.underline) {
		children = <u>{children}</u>;
	}

	return <span {...attributes}>{children}</span>;
};

const BlockButton = ({ format, icon, iconSize }) => {
	const editor = useSlate();
	return (
		<Button
			active={isBlockActive(editor, format)}
			onMouseDown={event => {
				event.preventDefault();
				toggleBlock(editor, format);
			}}>
			<Icon iconSize={iconSize}>{icon}</Icon>
		</Button>
	);
};

const MarkButton = ({ format, icon }) => {
	const editor = useSlate();
	return (
		<Button
			active={isMarkActive(editor, format)}
			onMouseDown={event => {
				event.preventDefault();
				toggleMark(editor, format);
			}}>
			<Icon>{icon}</Icon>
		</Button>
	);
};

const TextAreaInput = ({ state, setState, placeholder }) => {
	const renderElement = useCallback(props => <Element {...props} />, []);
	const renderLeaf = useCallback(props => <Leaf {...props} />, []);
	const editor = useMemo(() => withHistory(withReact(createEditor())), []);

	return (
		<Slate
			editor={editor}
			value={state}
			onChange={value => setState(value)}>
			<Toolbar>
				<MarkButton format='bold' icon='fas fa-bold' />
				<MarkButton format='italic' icon='fas fa-italic' />
				<MarkButton format='underline' icon='fas fa-underline' />
				<MarkButton format='code' icon='fas fa-code' />
				<BlockButton
					format='heading-two'
					icon='fas fa-heading'
					iconSize='small'
				/>
				<BlockButton format='heading-one' icon='fas fa-heading' />
				<BlockButton format='block-quote' icon='fas fa-quote-right' />
				<BlockButton format='numbered-list' icon='fas fa-list-ol' />
				<BlockButton format='bulleted-list' icon='fas fa-list-ul' />
			</Toolbar>
			<Editable
				renderElement={renderElement}
				renderLeaf={renderLeaf}
				placeholder={placeholder}
				autoFocus
				spellCheck
				onKeyDown={event => {
					for (const hotkey in HOTKEYS) {
						if (isHotkey(hotkey, event)) {
							event.preventDefault();
							const mark = HOTKEYS[hotkey];
							toggleMark(editor, mark);
						}
					}
				}}
			/>
		</Slate>
	);
};

export default TextAreaInput;
