<template>
  <div id="text-editor" class="dark:zinc-100 ">
      <div class="toolbar" v-if="editor">
      <div class="align-dropdown">
          <button class="dropbtn">Heading ▼</button>
          <div class="dropdown-content">
          <a
              v-for="index in 6"
              :class="{ active: editor.isActive('heading', { level: index }) }"
              :style="{ fontSize: 20 - index + 'px' }"
              @click="onHeadingClick(index)"
              role="button"
          >
              H{{ index }}
          </a>
          </div>
      </div>
      <button
          v-for="({ slug, option, active, icon }, index) in textActions"
          :class="{ active: editor.isActive(active) }"
          @click="onActionClick(slug, option)"
          class=""
      >
          <i :class="icon"></i>
      </button>
      </div>
      <editor-content :editor="editor" />
      <div v-if="editor" class="footer">
          <span class="characters-count" :class="maxLimit ? limitWarning : ''">
              {{ charactersCount }}
              {{ maxLimit ? `/ ${maxLimit} characters` : 'characters' }}
          </span>
          |
          <span class="words-count">{{ wordsCount }} words</span>
      </div>
  </div>
</template>

<script>
  import { Editor, EditorContent } from '@tiptap/vue-3'
  import StarterKit from '@tiptap/starter-kit'
  import TextAlign from '@tiptap/extension-text-align';
  import CharacterCount from '@tiptap/extension-character-count';

  export default {
      components: {
          EditorContent,
      },
      props: {
          modelValue: {
              type: String,
              default: '',
          },
          maxLimit: {
              type: Number,
              default: null,
          },
      },
      data() {
          return {
          editor: null,
          textActions: [
              { slug: 'bold', icon: 'ri-bold', active: 'bold' },
              { slug: 'italic', icon: 'ri-italic', active: 'italic' },
              { slug: 'underline', icon: 'ri-underline', active: 'underline' },
              { slug: 'strike', icon: 'ri-strikethrough', active: 'strike' },
              {
              slug: 'align',
              option: 'left',
              icon: 'ri-align-left',
              active: { textAlign: 'left' },
              },
              {
              slug: 'align',
              option: 'center',
              icon: 'ri-align-center',
              active: { textAlign: 'center' },
              },
              {
              slug: 'align',
              option: 'right',
              icon: 'ri-align-right',
              active: { textAlign: 'right' },
              },
              {
              slug: 'align',
              option: 'justify',
              icon: 'ri-align-justify',
              active: { textAlign: 'justify' },
              },
              { slug: 'bulletList', icon: 'ri-list-unordered', active: 'bulletList' },
              { slug: 'orderedList', icon: 'ri-list-ordered', active: 'orderedList' },
              { slug: 'subscript', icon: 'ri-subscript-2', active: 'subscript' },
              {
              slug: 'superscript',
              icon: 'ri-superscript-2',
              active: 'superscript',
              },
              { slug: 'undo', icon: 'ri-arrow-go-back-line', active: 'undo' },
              { slug: 'redo', icon: 'ri-arrow-go-forward-line', active: 'redo' },
              { slug: 'clear', icon: 'ri-format-clear', active: 'clear' },
              { slug: 'code', icon: 'ri-code-view', active: 'code' },
          ],
          };
      },
      computed: {
          charactersCount() {
              return this.editor.storage.characterCount.characters();
          },
          wordsCount() {
              return this.editor.storage.characterCount.words();
          },
          limitWarning() {
              const isCloseToMax = this.charactersCount >= this.maxLimit - 20;
              const isMax = this.charactersCount === this.maxLimit;
              if (isCloseToMax && !isMax) return 'warning';
              if (isMax) return 'danger';
              return '';
          },
      },
      watch: {
          modelValue(value) {
              if (this.editor.getHTML() === value) return;
              this.editor.commands.setContent(this.modelValue, false);
          },
      },
      methods: {
          onActionClick(slug, option = null) {
          const vm = this.editor.chain().focus();
          const actionTriggers = {
              bold: () => vm.toggleBold().run(),
              italic: () => vm.toggleItalic().run(),
              strike: () => vm.toggleStrike().run(),
              bulletList: () => vm.toggleBulletList().run(),
              orderedList: () => vm.toggleOrderedList().run(),
              align: () => vm.setTextAlign(option).run(),
              subscript: () => vm.toggleSubscript().run(),
              superscript: () => vm.toggleSuperscript().run(),
              undo: () => vm.undo().run(),
              redo: () => vm.redo().run(),
              clear: () => {
              vm.clearNodes().run();
              vm.unsetAllMarks().run();
              },
              code: () => vm.toggleCodeBlock().run(),
          };
          actionTriggers[slug]();
          },
          onHeadingClick(index) {
              const vm = this.editor.chain().focus();
              vm.toggleHeading({ level: index }).run();
          },
      },
      
      mounted() {
          this.editor = new Editor({
              content: this.modelValue,
              extensions: [
                  StarterKit,
                  Underline,
                  Subscript,
                  Superscript,
                  CharacterCount.configure({
                      limit: this.maxLimit,
                  }),
                  TextAlign.configure({
                      types: ['heading', 'paragraph'],
                  }),
              ],
              onUpdate: () => {
                  this.$emit('update:modelValue', this.editor.getHTML());
              },
          });
      },
      beforeUnmount() {
          this.editor.destroy();
      },
  };
</script>
<style>
.image-input {
    display: block;
    width: 200px;
    height: 200px;
    cursor: pointer;
    background-size: cover;
    background-position: center center;
}
.ProseMirror-focused {
    outline: none !important;
}
.tiptap p.is-empty::before {
    color: #adb5bd;
    content: attr(data-placeholder);
    float: left;
    height: 0;
    pointer-events: none;
}
.tiptap > * + * {
    margin-top: 0.75em;
}
.tiptap img {
    width: auto;
    object-fit: contain;
    border-radius: 4px;
    height: auto;
    margin-left: auto;
    margin-right: auto;
    display: block;
}
.tiptap img.ProseMirror-selectednode {
    outline: 3px solid #68cef8;
}
.tiptap .custom-image-small {
    max-width: 200px;
}
.tiptap .custom-image-medium {
    max-width: 500px;
}
.tiptap .custom-image-large {
    max-width: 100%;
}
.tiptap .custom-image-float-none {
    float: none;
}
.tiptap .custom-image-float-left {
    float: left;
}
.tiptap .custom-image-float-right {
    float: right;
}
.tiptap ul, .tiptap ol {
    padding: 0 1rem;
}
.tiptap h1, .tiptap h2, .tiptap h3, .tiptap h4, .tiptap h5, .tiptap h6 {
    line-height: 1.1;
    margin-left: 0;
    margin-right: 0;
    font-weight: bold;
    display: block;
}
.tiptap h1 {
    font-size: 2em;
    margin-top: 0.67em;
    margin-bottom: 0.67em;
}
.tiptap h2 {
    font-size: 1.5em;
    margin-top: 0.83em;
    margin-bottom: 0.83em;
}
.tiptap h3 {
    font-size: 1.17em;
    margin-top: 1em;
    margin-bottom: 1em;
}
.tiptap h4 {
    font-size: 1em;
    margin-top: 1.33em;
    margin-bottom: 1.33em;
}
.tiptap h5 {
    font-size: 0.83em;
    margin-top: 1.67em;
    margin-bottom: 1.67em;
}
.tiptap h6 {
    font-size: 0.67em;
    margin-top: 2.33em;
    margin-bottom: 2.33em;
}
.tiptap pre {
    background-color: rgba(97, 97, 97, 0.1);
    padding: 12px;
    border-radius: 5px;
}
.tiptap code {
    font-size: 0.9rem;
    padding: 0.25em;
    border-radius: 0.25em;
    color: #3f3f3f;
    box-decoration-break: clone;
}
.tiptap blockquote {
    padding-left: 1rem;
    border-left: 2px solid rgba(13, 13, 13, 0.1);
}
.tiptap hr {
    border: none;
    border-top: 2px solid rgba(13, 13, 13, 0.1);
    margin: 2rem 0;
}
/* Table-specific styling */
.tiptap {
    padding: 3em;
}
.tiptap table {
    border-collapse: collapse;
    table-layout: fixed;
    width: 100%;
    margin: 0;
    overflow: hidden;
}
.tiptap table td, .tiptap table th {
    min-width: 1em;
    border: 2px solid #ced4da;
    padding: 3px 5px;
    vertical-align: top;
    box-sizing: border-box;
    position: relative;
}
.tiptap table td > *, .tiptap table th > * {
    margin-bottom: 0;
}
.tiptap table th {
    font-weight: bold;
    text-align: left;
    background-color: #f1f3f5;
}
.tiptap table .selectedCell:after {
    z-index: 2;
    position: absolute;
    content: "";
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(200, 200, 255, 0.4);
    pointer-events: none;
}
.tiptap table .column-resize-handle {
    position: absolute;
    right: -2px;
    top: 0;
    bottom: -2px;
    width: 4px;
    background-color: #adf;
    pointer-events: none;
}
.tiptap table p {
    margin: 0;
}
.tiptap a {
    color: #006895;
    cursor: pointer;
}
.tiptap a:hover {
    text-decoration: underline;
}
.tiptap mark {
    background-color: #ffe066;
    padding: 0.125em 0;
    border-radius: 0.25em;
    box-decoration-break: clone;
}
.tableWrapper {
    overflow-x: auto;
}
.resize-cursor {
    cursor: ew-resize;
    cursor: col-resize;
}
</style>