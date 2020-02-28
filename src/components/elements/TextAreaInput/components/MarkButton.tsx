import React from 'react';
import { useSlate, ReactEditor } from 'slate-react';
import { Editor } from 'slate';

import Button from './Button';
import Icon from './Icon';

const isMarkActive = (editor: ReactEditor, format: string) => {
	const marks = Editor.marks(editor);
	return marks ? marks[format] === true : false;
};

const toggleMark = (editor: ReactEditor, format: string) => {
	const isActive = isMarkActive(editor, format);

	if (isActive) {
		Editor.removeMark(editor, format);
	} else {
		Editor.addMark(editor, format, true);
	}
};

const MarkButton = ({ format, icon }: { format: string; icon: string }) => {
	const editor = useSlate();
	return (
		<Button
			active={isMarkActive(editor, format)}
			onMouseDown={event => {
				event.preventDefault();
				toggleMark(editor, format);
			}}
		>
			<Icon>{icon}</Icon>
		</Button>
	);
};

export default MarkButton;
