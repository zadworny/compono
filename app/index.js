document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('/api');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const xmlText = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, 'application/xml');

    const candidates = xmlDoc.getElementsByTagName('candidate');
    const candidateList = document.createElement('ul');

    for (let i = 0; i < candidates.length; i++) {
      const candidate = candidates[i];
      const name = candidate.getElementsByTagName('name')[0].textContent;
      const position = candidate.getElementsByTagName('last_position')[0].textContent;
      const applicationDate = candidate.getElementsByTagName('application_date')[0].textContent;

      const listItem = document.createElement('li');
      listItem.textContent = `${name} - ${position} (Applied on: ${applicationDate})`;
      candidateList.appendChild(listItem);
    }

    document.body.appendChild(candidateList);
  } catch (error) {
    console.error('Error fetching candidates:', error);
  }
});
