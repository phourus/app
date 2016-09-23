export const get = (context, id) => {
  return {type: 'PROFILE_GET', context, id}
}
