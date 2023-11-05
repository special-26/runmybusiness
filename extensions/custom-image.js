import Image from '@tiptap/extension-image'
import { mergeAttributes } from '@tiptap/vue-3'

export default Image.extend({
    name: 'custom-image',

    addOptions: {
        ...Image.options,
        sizes: ['small', 'medium', 'large']
    },

    addAttributes() {
        return {
            ...Image.config.addAttributes(),
            size: {
                default: 'medium',
                rendered: false
            },
            float: {
                default: 'none',
                rendered: false
            }
        }
    },

    addCommands() {
        return {
            setImage: (options) => ({ tr, dispatch }) => {
                const { selection } = tr
                const node = this.type.create(options)

                if (dispatch) {
                    tr.replaceRangeWith(selection.from, selection.to, node)
                }

                return true
            },
            setSize: (attributes) => ({ tr, dispatch }) => {
                const { selection } = tr

                const options = {
                    ...selection.node.attrs,
                    ...attributes
                }

                const node = this.type.create(options)

                if (dispatch) {
                    tr.replaceRangeWith(selection.from, selection.to, node)
                }
            }
        }
    },

    renderHTML({ node, HTMLAttributes }) {
        const size = node.attrs.size
        HTMLAttributes.class = ' custom-image-' + size

        return [
            'img',
            mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)
        ]
    }
})