import PropTypes from 'prop-types';
import {
    Bold,
    Strikethrough,
    Italic,
    List,
    ListOrdered,
    Heading2,
    Heading3,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Toggle } from '@/components/ui/toggle';

const ProductToolbar = ({ editor }) => {
    if (!editor) return null;

    return (
        <div className='border border-input bg-transparent rounded-br-md rounded-bl-md p-1 flex flex-row items-center gap-1'>
            <Toggle
                size='sm'
                pressed={editor.isActive('heading', { level: 2 })}
                onPressedChange={() =>
                    editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
            >
                <Heading2 className='h-4 w-4' />
            </Toggle>
            <Toggle
                size='sm'
                pressed={editor.isActive('heading', { level: 3 })}
                onPressedChange={() =>
                    editor.chain().focus().toggleHeading({ level: 3 }).run()
                }
            >
                <Heading3 className='h-4 w-4' />
            </Toggle>
            <Toggle
                size='sm'
                pressed={editor.isActive('bold')}
                onPressedChange={() =>
                    editor.chain().focus().toggleBold().run()
                }
            >
                <Bold className='h-4 w-4' />
            </Toggle>
            <Toggle
                size='sm'
                pressed={editor.isActive('italic')}
                onPressedChange={() =>
                    editor.chain().focus().toggleItalic().run()
                }
            >
                <Italic className='h-4 w-4' />
            </Toggle>
            <Toggle
                size='sm'
                pressed={editor.isActive('strike')}
                onPressedChange={() =>
                    editor.chain().focus().toggleStrike().run()
                }
            >
                <Strikethrough className='h-4 w-4' />
            </Toggle>
            <Separator orientation='vertical' className='w-[1px] h-8' />
            <Toggle
                size='sm'
                pressed={editor.isActive('bulletList')}
                onPressedChange={() =>
                    editor.chain().focus().toggleBulletList().run()
                }
            >
                <List className='h-4 w-4' />
            </Toggle>
            <Toggle
                size='sm'
                pressed={editor.isActive('orderedList')}
                onPressedChange={() =>
                    editor.chain().focus().toggleOrderedList().run()
                }
            >
                <ListOrdered className='h-4 w-4' />
            </Toggle>
        </div>
    );
};

export default ProductToolbar;

ProductToolbar.propTypes = {
    editor: PropTypes.any,
};
