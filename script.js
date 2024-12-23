<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Markdown Notes</title>
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
    <meta http-equiv="Pragma" content="no-cache">
    <meta http-equiv="Expires" content="0">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/simplemde/latest/simplemde.min.css">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div id="menu">
        <button onclick="showEditor()">添加notes</button>
        <button onclick="listNotes()">列出所有notes</button>
    </div>
    <div id="content">
        <textarea id="markdown-editor"></textarea>
        <button id="save-button" onclick="saveNote()">保存</button>
        <div id="notes-list"></div>
    </div>
    <script src="https://cdn.jsdelivr.net/simplemde/latest/simplemde.min.js"></script>
    <script>
        let simplemde;

        document.addEventListener('DOMContentLoaded', () => {
            simplemde = new SimpleMDE({ element: document.getElementById('markdown-editor') });
            listNotes();
        });

        function showEditor() {
            document.getElementById('markdown-editor').style.display = 'block';
            document.getElementById('save-button').style.display = 'block';
            document.getElementById('notes-list').style.display = 'none';
        }

        function saveNote() {
            const content = simplemde.value();
            const notes = JSON.parse(localStorage.getItem('notes')) || [];
            const note = {
                content: content,
                createTime: new Date().toISOString()
            };
            notes.push(note);
            localStorage.setItem('notes', JSON.stringify(notes));
            alert('Note saved!');
            simplemde.value('');
            listNotes();
        }

        function listNotes() {
            document.getElementById('markdown-editor').style.display = 'none';
            document.getElementById('save-button').style.display = 'none';
            document.getElementById('notes-list').style.display = 'block';

            const notes = JSON.parse(localStorage.getItem('notes')) || [];
            const notesList = document.getElementById('notes-list');
            notesList.innerHTML = '';

            notes.forEach((note, index) => {
                const noteDiv = document.createElement('div');
                noteDiv.className = 'note';
                noteDiv.innerHTML = `
                    <div>
                        <strong>Note ${index + 1}</strong> - ${new Date(note.createTime).toLocaleString()}
                    </div>
                    <button onclick="showNoteContent(${index})">显示内容</button>
                `;
                notesList.appendChild(noteDiv);
            });
        }

        function showNoteContent(index) {
            const notes = JSON.parse(localStorage.getItem('notes')) || [];
            const note = notes[index];
            simplemde.value(note.content);
            showEditor();
        }
    </script>
</body>
</html>
