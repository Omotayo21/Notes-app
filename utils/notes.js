import AsyncStorage from '@react-native-async-storage/async-storage';

const NOTES_KEY = 'notes';

export async function getNotes(includeArchived = false) {
  const data = await AsyncStorage.getItem(NOTES_KEY);
  let notes = data ? JSON.parse(data) : [];
  if (!includeArchived) {
    notes = notes.filter(n => !n.archived);
  }
  notes.sort((a, b) => (b.updated || b.created) - (a.updated || a.created));
  return notes;
}

export async function saveNotes(notes) {
  await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(notes));
}

export async function addOrUpdateNote(note) {
  let notes = await getNotes(true);
  const exists = notes.find(n => n.id === note.id);
  if (exists) {
    Object.assign(exists, note, { updated: Date.now() });
  } else {
    notes.push({ ...note, id: note.id || String(Date.now()), created: Date.now(), updated: Date.now(), archived: false });
  }
  await saveNotes(notes);
}

export async function archiveNote(id) {
  let notes = await getNotes(true);
  notes = notes.map(n => n.id === id ? { ...n, archived: true, updated: Date.now() } : n);
  await saveNotes(notes);
}

export async function restoreNote(id) {
  let notes = await getNotes(true);
  notes = notes.map(n => n.id === id ? { ...n, archived: false, updated: Date.now() } : n);
  await saveNotes(notes);
}

export async function deleteNote(id) {
  let notes = await getNotes(true);
  notes = notes.filter(n => n.id !== id);
  await saveNotes(notes);
}

