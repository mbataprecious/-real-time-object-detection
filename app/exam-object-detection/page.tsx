import { Container } from '@/components/Container'
import ObjectDetectionSection from '@/components/ObjectDetection'
import React from 'react'

const Page = () => {
  return (
    <div>    
        <main className=" mt-6">
    <Container className=" max-w-[832px]">
      <div className=" w-full rounded-[20px] bg-white py-9 px-12">
        <h3 className=" font-medium text-xl">System check</h3>
        <p className=" text-sm text-[#4A4A68] mt-2 mb-[30px]">
          We utilize your camera image to ensure fairness for all
          participants, and we also employ both your camera and microphone for
          a video questions where you will be prompted to record a response
          using your camera or webcam, so it's essential to verify that your
          camera and microphone are functioning correctly and that you have a
          stable internet connection. To do this, please position yourself in
          front of your camera, ensuring that your entire face is clearly
          visible on the screen. This includes your forehead, eyes, ears,
          nose, and lips. You can initiate a 5-second recording of yourself by
          clicking the button below.
        </p>
        <ObjectDetectionSection />
      </div>
    </Container>
  </main></div>
  )
}

export default Page