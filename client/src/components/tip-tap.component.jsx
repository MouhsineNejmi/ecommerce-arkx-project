import PropTypes from 'prop-types';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import ProductToolbar from './product-toolbar.component';

const TipTap = ({ description, setRichText }) => {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                bulletList: {
                    keepMarks: true,
                    keepAttributes: false,
                },
                orderedList: {
                    keepMarks: true,
                    keepAttributes: false,
                },
                heading: {
                    levels: [2],
                    HTMLAttributes: {
                        class: 'text-xl font-bold',
                        levels: [2],
                    },
                },
            }),
        ],
        content: description,
        editorProps: {
            attributes: {
                class: 'rounded-md h-full border border-input bg-background px-5 py-3 my-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            },
        },
        onUpdate({ editor }) {
            console.log(editor.getHTML());
            setRichText(editor.getHTML());
        },
    });

    return (
        <div className='flex flex-col justify-stretch'>
            <ProductToolbar editor={editor} />
            <EditorContent editor={editor} className='h-52' />{' '}
        </div>
    );
};

export default TipTap;

TipTap.propTypes = {
    description: PropTypes.string,
    setRichText: PropTypes.func,
};
