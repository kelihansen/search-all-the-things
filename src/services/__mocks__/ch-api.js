export function getItem(id) {
  return new Promise(resolve => {
    resolve({
      object: {
        id: id,
        title: 'Cool Museum Thing',
        medium: 'wool, steel',
        description: null,
        images: [
          {
            z: {
              url: 'http://coolthings.com.jpg'
            }
          }
        ]
      }
    });
  });   
}