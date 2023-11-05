import { VueRenderer } from "@tiptap/vue-3";
import tippy from 'tippy.js';

import CommandsList from '@/components/CommandsList.vue'

export default {
    items: ({ query }) => {
        return[
            {
                title: 'Paragraph',
                icon: 'ph-paragraph-fill',
                description: 'Normal text paragraph',
                command: ({ editor, range }) => {
                    editor
                        .chain()
                        .focus()
                        .deleteRange(range)
                        .setParagraph()
                        .run()
                }
            },
            {
                title: 'Heading 1',
                icon: 'ci-heading-h1',
                description: 'Big Heading',
                command: ({ editor, range }) => {
                    editor
                        .chain()
                        .focus()
                        .deleteRange(range)
                        .setNode('heading', { level: 1 })
                        .run()
                }
            },
            {
                title: 'Heading 2',
                icon: 'ci-heading-h2',
                description: 'Medium Heading',
                command: ({ editor, range }) => {
                    editor
                        .chain()
                        .focus()
                        .deleteRange(range)
                        .setNode('heading', { level: 2 })
                        .run()
                }
            },
            {
                title: 'Heading 3',
                icon: 'ci-heading-h3',
                description: 'Small Heading',
                command: ({ editor, range }) => {
                    editor
                        .chain()
                        .focus()
                        .deleteRange(range)
                        .setNode('heading', { level: 3 })
                        .run()
                }
            },
            {
                title: 'Bold',
                icon: 'ic-baseline-format-bold',
                description: 'Text Bold',
                command: ({ editor, range }) => {
                    editor
                        .chain()
                        .focus()
                        .deleteRange(range)
                        .toggleBold()
                        .run()
                }
            },
            {
                title: 'Italic',
                icon: 'ic-baseline-format-italic',
                description: 'Text Italic',
                command: ({ editor, range }) => {
                    editor
                        .chain()
                        .focus()
                        .deleteRange(range)
                        .toggleItalic()
                        .run()
                }
            },
            {
                title: 'Code',
                icon: 'ph-code-bold',
                description: 'Code block',
                command: ({ editor, range }) => {
                    editor
                        .chain()
                        .focus()
                        .deleteRange(range)
                        .toggleCodeBlock()
                        .run()
                }
            },
            {
                title: 'Bullet List',
                icon: 'ic-round-format-list-bulleted',
                description: 'Create unordered bullet list',
                command: ({ editor, range }) => {
                    editor
                        .chain()
                        .focus()
                        .deleteRange(range)
                        .toggleBulletList()
                        .run()
                }
            },
            {
                title: 'Numbered List',
                icon: 'ic-round-format-list-numbered',
                description: 'Create numbered list',
                command: ({ editor, range }) => {
                    editor
                        .chain()
                        .focus()
                        .deleteRange(range)
                        .toggleOrderedList()
                        .run()
                }
            },
            {
                title: 'Blockquote',
                icon: 'tabler-blockquote',
                description: 'Create quotes in a blockquote',
                command: ({ editor, range }) => {
                    editor
                        .chain()
                        .focus()
                        .deleteRange(range)
                        .toggleBlockquote()
                        .run()
                }
            },
            {
                title: 'Horizontal Line',
                icon: 'ic-twotone-horizontal-rule',
                description: 'Create a horizontal line below',
                command: ({ editor, range }) => {
                    editor
                        .chain()
                        .focus()
                        .deleteRange(range)
                        .setHorizontalRule()
                        .run()
                }
            },
        ].filter(item => item.title.toLowerCase().startsWith(query.toLowerCase())).slice(0, 10)
    },

    render: () => {
        let component
        let popup

        return {
            onStart: props => {
                component = new VueRenderer(CommandsList, {
                    props,
                    editor: props.editor,
                })

                if(!props.clientRect){
                    return
                }

                popup = tippy('body', {
                    getReferenceClientRect: props.clientRect,
                    appendTo: () => document.body,
                    content: component.element,
                    showOnCreate: true,
                    interactive: true,
                    trigger: 'manual',
                    placement: 'bottom-start',
                })
            },

            onUpdated(props) {
                component.updateProps(props)

                if(!props.clientRect){
                    return
                }

                popup[0].setProps({
                    getReferenceClientRect: props.clientRect,
                })
            },

            onKeyDown(props){
                if(props.event.key === 'Escape'){
                    popup[0].hide()

                    return true
                }
                return component.ref?.onKeyDown(props)
            },

            onExit(){
                popup[0].destroy()
                component.destroy()
            }
        }
    }
}