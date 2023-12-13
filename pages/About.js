export default function About() {
  return (
    <div className='text-english-violet pt-4 text-xl'>
      <p className=''>
        The Living Archive is a virtual archive dedicated to highlighting the
        lives and experiences of LMU's queer community. Currently, it consists
        of records from the LMU yearbooks and student newspapers, curated by LMU
        alum Jordan Boaz as a part of her senior thesis project for Women's and
        Gender Studies. See{' '}
        <a
          className='underline hover:text-rose'
          href='https://youtu.be/HGTrpx2RwcU?si=Px7fYoz-O_3aPrRN&t=2030'
          target='_blank'
          rel='noopener noreferrer'
        >
          this presentation
        </a>{' '}
        to learn more about Jordan's project.
      </p>
      <br></br>
      <p>
        Created by Tori Wei. Visit the GitHub repository{' '}
        <a
          className='underline hover:text-rose'
          href='https://github.com/toriwei/the-living-archive'
          target='_blank'
          rel='noopener noreferrer'
        >
          here.
        </a>
      </p>
    </div>
  )
}
