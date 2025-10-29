export function sortProjectsByDate(projects) {
    if (!projects) {
        return [];
    }

    return projects.slice().sort((a, b) => {
        const dateA = new Date(a.data.date.start);
        const dateB = new Date(b.data.date.start);
        return dateB.getTime() - dateA.getTime();
    });
}