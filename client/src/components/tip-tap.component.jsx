// import React from 'react';
import PropTypes from 'prop-types';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import ProductToolbar from './product-toolbar.component';

const TipTap = ({ description, setRichText }) => {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                bulletList: {},
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
        <div className='flex flex-col justify-stretch min-h-[250px]'>
            <ProductToolbar editor={editor} />
            <EditorContent editor={editor} className='h-[200px]' />
        </div>
    );
};

export default TipTap;

TipTap.propTypes = {
    description: PropTypes.string,
    setRichText: PropTypes.func,
};
