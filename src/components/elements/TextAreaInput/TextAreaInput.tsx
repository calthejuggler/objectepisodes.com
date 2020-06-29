import React, {
	useMemo,
	FC,
	useCallback,
	Dispatch,
	SetStateAction,
} from 'react';
import { createEditor, Node, Editor } from 'slate';
import { isHotkey } from 'is-hotkey';

import {
	Slate,
	Editable,
	withReact,
	ReactEditor,
	RenderElementProps,
	RenderLeafProps,
} from 'slate-react';
import MarkButton from './components/MarkButton';
import Toolbar from './components/Toolbar';
import BlockButton from './components/BlockButton';

interface TextAreaInterface {
	state: Node[];
	setState: Dispatch<SetStateAction<Node[]>>;
	placeholder: string;
	setInputMark?: Dispatch<SetStateAction<string>>;
}

const Element = ({ attributes, children, element }: RenderElementProps) => {
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
		case 'link':
			return (
				<pre {...attributes}>
					<a
						href={children}
						target='_blank'
						rel='noopener noreferrer'
					>
						{children}
					</a>
				</pre>
			);
		default:
			return <p {...attributes}>{children}</p>;
	}
};

const Leaf = ({ attributes, children, leaf }: RenderLeafProps) => {
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

const TextAreaInput: FC<TextAreaInterface> = ({
	state,
	setState,
	placeholder,
	setInputMark,
}) => {
	const editor: ReactEditor = useMemo(() => withReact(createEditor()), []);

	const HOTKEYS: object = {
		'mod+b': 'bold',
		'mod+i': 'italic',
		'mod+u': 'underline',
	};

	const toggleMark = (editor: ReactEditor, format: string) => {
		const isActive = isMarkActive(editor, format);

		if (isActive) {
			Editor.removeMark(editor, format);
		} else {
			Editor.addMark(editor, format, true);
			setInputMark && setInputMark(format);
		}
	};

	const isMarkActive = (editor: ReactEditor, format: string) => {
		const marks = Editor.marks(editor);
		return marks ? marks[format] === true : false;
	};

	const renderElement = useCallback(
		(props: RenderElementProps) => <Element {...props} />,
		[]
	);
	const renderLeaf = useCallback(
		(props: RenderLeafProps) => <Leaf {...props} />,
		[]
	);

	return (
		<Slate
			editor={editor}
			value={state}
			onChange={(value: Node[]) => setState(value)}
			onKeyDown={(event: KeyboardEvent) => {
				for (const hotkey in HOTKEYS) {
					if (isHotkey(hotkey, event)) {
						event.preventDefault();
						const markKeys: Array<string> = Object.keys(HOTKEYS);
						const markValues: Array<string> = Object.values(
							HOTKEYS
						);

						let mark: string = 'regular';
						for (let i = 0; i <= markKeys.length; i++) {
							if (markKeys[i] === hotkey) mark = markValues[i];
						}

						toggleMark(editor, mark);
					}
				}
			}}
		>
			<Toolbar>
				<MarkButton format='bold' icon='fas fa-bold' />
				<MarkButton format='italic' icon='fas fa-italic' />
				<MarkButton format='underline' icon='fas fa-underline' />
				<BlockButton
					format='heading-two'
					icon='fas fa-heading'
					iconSize='small'
				/>
				<BlockButton format='block-quote' icon='fas fa-quote-right' />
				<BlockButton format='numbered-list' icon='fas fa-list-ol' />
				<BlockButton format='bulleted-list' icon='fas fa-list-ul' />
				<BlockButton format='link' icon='fas fa-link' />
			</Toolbar>
			<Editable
				renderElement={renderElement}
				renderLeaf={renderLeaf}
				placeholder={placeholder}
				style={{ minHeight: '10rem' }}
				className='bg-dark text-white p-2'
				autoFocus
				spellCheck
			/>
		</Slate>
	);
};

export default TextAreaInput;
