import { EventComponent } from "./(root)/_components/eventComponent"

const LandingPage = () => {
  const img = "https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"
  const list = [{name:"International Soup day", img:img},{name:"Opera in Hagaparken", img}, {name:"Våffeldagen", img}]

  return (
      <div className="flex justify-center flex-col items-center w-full p-2 mt-8">
        <div className="">
          <h1>Welcome to (insert name here)</h1>
          <p>We display all the current events happening around Stockholm. See anything interesting? Don't forget to sign up for the event in time!</p>
            <div className="flex justify-center items center">
              <img src={img} alt="" />
            </div>
          <p className="flex text-xl mt-20 justify-center items-center">Check out the current events!</p>
        </div>
        <div className="border p-2 rounded border-green-400 flex gap-4 mt-5">
          {list.map((item, i) => {
            return <EventComponent name={item.name} img={item.img}/>
          })}
        </div>
      </div>
  )
}

export default LandingPage