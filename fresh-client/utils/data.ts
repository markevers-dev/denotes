export const getAllNotes = async () => {
  try {
    const res = await fetch("http://localhost:8000/notes");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getNoteById = async (id: string) => {
  try {
    const res = await fetch(`http://localhost:8000/notes/${id}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
