import { EventComponent } from "./(root)/_components/eventComponent"

const LandingPage = () => {
  const img = "https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"
  const list = [{name:"International Soup day", img:img},{name:"Opera in Hagaparken", img}, {name:"Våffeldagen", img}]

  return (
      <div className="flex justify-center flex-col items-center w-full p-2 mt-8">
        <div className="">
          <h1>Welcome to (insert name here)</h1>
          <p>Check out our current events!</p>
        </div>
        <div className="front-image">
          <img src={img} alt="" />
        </div>
        <div className="border p-2 rounded border-green-400 flex gap-4 mt-10">
          {list.map((item, i) => {
            return <EventComponent name={item.name} img={item.img}/>
          })}
        </div>
      </div>
  )
}

export default LandingPage