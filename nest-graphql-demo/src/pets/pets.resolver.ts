import { Resolver,Query, Mutation, Args, Int, Parent, ResolveField } from '@nestjs/graphql';
import { Owner } from 'src/owners/entities/owner.entity';
import { CreatePetInput } from './create-pet.input';
import { Pet } from './pet.entity';
import { PetsService } from './pets.service';

@Resolver(of => Pet)
export class PetsResolver {

    constructor(private petsService : PetsService){}

    @Query(returns => [Pet])
    pets() : Promise<Pet[]>{
        return this.petsService.findAll();
    }

    @Query(returns => Pet)
    getPet(@Args('id',{type : () => Int}) id : number) : Promise<Pet>{
        return this.petsService.findOne(id)
    }

    @ResolveField(returns => Owner)
    owner(@Parent() pet : Pet) : Promise<Owner>{
        return this.petsService.getOwner(pet.ownerId);
    }

    @Mutation(returns => Pet)
    createPet(@Args('createPetInput') createPetInput : CreatePetInput) : Promise<Pet>{
        return this.petsService.createPet(createPetInput)
    }
}