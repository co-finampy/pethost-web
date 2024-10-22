export default async function signOut() {
  try {
    const response = await fetch('/api/auth/sign-out', {
      method: 'GET',
    });

    if (response.ok) {
      window.location.href = '/';
    }
  } catch (error) {
    console.error('Failed to sign out', error);
  }
}