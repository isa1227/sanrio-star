export default function EmailVerified() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md text-center">
        <h1 className="text-2xl font-bold text-green-600">¡Correo activado!</h1>
        <p className="mt-4 text-gray-700">Tu cuenta ha sido verificada correctamente.</p>
      </div>
    </div>
  );
}
