import React, { FunctionComponent } from 'react';
import { useSlate, ReactEditor } from 'slate-react';
import { Editor, Transforms } from 'slate';
import Button from './Button';
import Icon from './Icon';

const isBlockActive = (editor: ReactEditor, format: string) => {
	const [match] = Editor.nodes(editor, {
		match: n => n.type === format
	});

	return !!match;
};

const LIST_TYPES = ['numbered-list', 'bulleted-list'];

const toggleBlock = (editor: ReactEditor, format: string) => {
	const isActive = isBlockActive(editor, format);
	const isList = LIST_TYPES.includes(format);

	Transforms.unwrapNodes(editor, {
		match: n => LIST_TYPES.includes(n.type),
		split: true
	});

	Transforms.setNodes(editor, {
		type: isActive ? 'paragraph' : isList ? 'list-item' : format
	});

	if (!isActive && isList) {
		const block = { type: format, children: [] };
		Transforms.wrapNodes(editor, block);
	}
};

interface IBlockButton {
	format: string;
	icon: string;
	iconSize?: string;
}

const BlockButton: FunctionComponent<IBlockButton> = ({
	format,
	icon,
	iconSize
}) => {
	const editor: ReactEditor = useSlate();
	return (
		<Button
			active={isBlockActive(editor, format)}
			onMouseDown={event => {
				event.preventDefault();
				toggleBlock(editor, format);
			}}
		>
			<Icon iconSize={iconSize}>{icon}</Icon>
		</Button>
	);
};

export default BlockButton;
