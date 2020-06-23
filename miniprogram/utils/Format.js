export const DepartFormat = key => {
  if (key === 'editor') return '编辑部';
  else if (key === 'office') return '策划部';
  else if (key === 'media') return '媒体部';
  else if (key === 'onecho') return 'One Echo';
  else if (key === 'workshop') return '雁祉作坊';
  else return key;
}