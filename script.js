let simplemde;

document.addEventListener('DOMContentLoaded', () => {
    simplemde = new SimpleMDE({ element: document.getElementById('markdown-editor') });
    listNotes();
});

function showEditor() {
    const noteTitle = document.getElementById('note-title');
    const markdownEditor = document.getElementById('markdown-editor');
    const saveButton = document.getElementById('save-button');
    const notesList = document.getElementById('notes-list');

    if (noteTitle && markdownEditor && saveButton && notesList) {
        noteTitle.style.display = 'block';
        markdownEditor.style.display = 'block';
        saveButton.style.display = 'block';
        notesList.style.display = 'none';
    }
}

function saveNote() {
    const title = document.getElementById('note-title').value.trim();
    if (!title) {
        alert('Please enter a title for the note.');
        return;
    }

    const content = simplemde.value();
    const note = {
        title: title,
        content: content,
        createTime: new Date().toISOString()
    };

    // Save note to localStorage
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.push(note);
    localStorage.setItem('notes', JSON.stringify(notes));

    alert('Note saved!');
    simplemde.value('');
    document.getElementById('note-title').value = '';
    listNotes();
}

function listNotes() {
    const noteTitle = document.getElementById('note-title');
    const markdownEditor = document.getElementById('markdown-editor');
    const saveButton = document.getElementById('save-button');
    const notesList = document.getElementById('notes-list');

    if (noteTitle && markdownEditor && saveButton && notesList) {
        noteTitle.style.display = 'none';
        markdownEditor.style.display = 'none';
        saveButton.style.display = 'none';
        notesList.style.display = 'block';

        const notes = JSON.parse(localStorage.getItem('notes')) || [];
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
}

function showNoteContent(index) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const note = notes[index];
    simplemde.value(note.content);
    document.getElementById('note-title').value = note.title;
    showEditor();
}
