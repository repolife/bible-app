import { trpc } from './trpc'

export const  IndexPage = () => {
const useQuery = trpc.useQuery(["hello"])
const hello = trpc.hello.useQuery()
  console.log(hello)
  console.log(useQuery.data)

  return (
  <div>
  <p>{JSON.stringify(useQuery.data)}</p>
      </div>
  )

  }

