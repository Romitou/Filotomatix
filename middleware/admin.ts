export default function (context: any) {
  if (!context.$auth.$state.user.isAdmin) {
    return context.$auth.redirect('home');
  }
};
