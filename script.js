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
