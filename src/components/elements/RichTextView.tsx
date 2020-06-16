import React, { useMemo, useCallback } from 'react';
import {
	Slate,
	Editable,
	withReact,
	RenderElementProps,
	RenderLeafProps,
} from 'slate-react';
import { createEditor } from 'slate';

const RichTextView = ({ content }: { content: any }) => {
	const renderElement = useCallback((props) => <Element {...props} />, []);
	const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
	const editor = useMemo(() => withReact(createEditor()), []);

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
				const link = children.props.node.children[0].text
				return (
					<a
						href={link}
						target='_blank'
						rel='noopener noreferrer'
						{...attributes}
					>
						{children}
					</a>
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

	return (
		<Slate editor={editor} value={content} onChange={() => {}}>
			<Editable
				readOnly
				renderElement={renderElement}
				renderLeaf={renderLeaf}
			/>
		</Slate>
	);
};

export default RichTextView;
