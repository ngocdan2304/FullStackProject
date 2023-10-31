import { useState, useEffect, useMemo } from 'react'
import { useLoaderData, useLocation, useSubmit } from 'react-router-dom';
import {
  ContentState,
  convertFromHTML,
  convertToRaw,
  EditorState,
} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import { debounce } from '@mui/material';

export default function Note() {
  const { note } = useLoaderData();
  const submit = useSubmit();
  const location = useLocation();
  const [editorState, setEditorState] = useState(() => {
    return EditorState.createEmpty();
  })

  const [rawHtml, setRawHtml] = useState(note.content);

  useEffect(() => {
    const blocksFromHTML = convertFromHTML(note.content);
    const state = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    );
    setEditorState(EditorState.createWithContent(state));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [note.id]);

  useEffect(() => {
    debouncedMemorized(rawHtml, note, location.pathname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rawHtml, location.pathname]);

  const debouncedMemorized = useMemo(() => {
    return debounce((rawHTML, note, pathname) => {
      if (rawHTML === note.content) return;

      submit({ ...note, content: rawHTML }, {
        method: 'post',
        action: pathname
      })
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setRawHtml(note.content);
  }, [note.content])

  const handleOnChange = (e) => {
    setEditorState(e);
    let text = e.getCurrentContent().getPlainText();
    setRawHtml(text ? draftToHtml(convertToRaw(e.getCurrentContent())) : text);
  }

  return (
    <Editor
      editorState={editorState}
      placeholder='Write something'
      onEditorStateChange={handleOnChange}
    />
  )
}
