import Image from 'next/image'
import React from 'react'

type PropertiesGridProps = {
    properties: any[]
}

const PropertiesGrid: React.FC<PropertiesGridProps> = ({properties}) => {


  return (
    <div>
        {properties.map((property, i) => (
            <div className=''>
                <Image src={property.images[0]} alt={`host-thumbnail-${property.userId}`} width={128} height={128} />
                {property.address}
            </div>
        ))}
    </div>
  )
}

export default PropertiesGrid