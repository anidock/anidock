import Navbar from '../components/Navbar'
import { useAuth } from '../lib/AuthContext'

export default function Profile(){
  const { user } = useAuth()
  return (
    <div>
      <Navbar />
      <div className="container-edge py-6 space-y-4">
        <h1 className="text-2xl font-bold">Profile</h1>
        <div className="card p-4 text-sm">
          <div><span className="text-zinc-400">User ID:</span> {user?.id}</div>
          <div><span className="text-zinc-400">Email:</span> {user?.email}</div>
        </div>
      </div>
    </div>
  )
}
