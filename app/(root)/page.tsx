import InterviewCard from "@/components/InterviewCard";
import { Button } from "@/components/ui/button";
import { dummyInterviews } from "@/constants";
import { getCurrentUser, getInterviewByUserId, getLatestInterview } from "@/lib/actions/auth.actions ";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const user = await getCurrentUser();

  const [userInterviews, latestInterview] = await Promise.all([
    await getInterviewByUserId(user?.id!),
    await getLatestInterview({ userId: user?.id! })

  ])

  const hasPastInterviews = userInterviews?.length > 0; 
  const hasLatestInterviews = latestInterview?.length > 0; 
  return (
    <>
     <section className="card-cta">
       <div className="flex flex-col gap-6 maz-w-lg">
          <h2>Get Interview-Ready with AI-Powered Practice &FeedBack</h2>
          <p className="text-lg">
             Practice on Real Interview Question & Get Instant FeedBack
          </p>
          <Button asChild className="btn-primary max-sm:w-full">
            <Link href="/interview">
               Start An Interview
            </Link>
          </Button>
       </div>
       <Image src="/robot.png" alt="robo-dude" width={400} height={400} className="max-sm:hidden" />
     </section>

     <section className="flex flex-col gap-6 mt-8">
      <h2>Your Interviews</h2>

      <div className="interviews-section">
        { 
         hasPastInterviews ? (
          userInterviews?.map((interview) => (
            <InterviewCard  {...interview} key={interview.id} />
          ))
         ) :  <p>There are No Interviews Available</p>
        }
      </div>
     </section>

     <section className="flex flex-col gap-6 mt-8 ">
        <h2>Take an Interview </h2>

        <div className="interviews-section">
        { 
         hasLatestInterviews ? (
          latestInterview?.map((interview) => (
            <InterviewCard  {...interview} key={interview.id} />
          ))
         ) :  <p>There are No New Interviews Available</p>
        }
        </div>
     </section>
    </>
  );
}
