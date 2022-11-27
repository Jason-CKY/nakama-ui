import { Skeleton } from '@mantine/core';

interface IProjectListSkeleton {
    number?: number;
}
export function ProjectListSkeleton({ number }: IProjectListSkeleton) {
    const RowSkeleton = [];
    const num_loops = !!number ? number : 1;
    for (let i = 0; i < num_loops; i++) {
        RowSkeleton.push(
            <tr key={i}>
                <td>
                    <div className="flex items-center">
                        <Skeleton height={85} width={85} radius="md" />
                        <div className="ml-5">
                            <Skeleton height={20} width={200} radius="xl" />
                            <Skeleton height={10} mt={6} radius="xl" />
                        </div>
                    </div>
                </td>
                <td>
                    <div className="flex justify-end items-center">
                        <Skeleton height={10} width={200} radius="xl" />
                    </div>
                </td>
                <td>
                    <div className="flex justify-end items-center">
                        <Skeleton height={15} circle className="mx-1" />
                        <Skeleton height={30} width={70} radius="sm" className="mx-1" />
                        <Skeleton height={30} width={70} radius="sm" className="mx-1" />
                        <Skeleton height={20} circle className="mx-1" />
                        <Skeleton height={20} circle className="mx-1" />
                    </div>
                </td>
            </tr>
        );
    }
    return <>{RowSkeleton}</>;
}
